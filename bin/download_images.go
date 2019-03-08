package main

import (
  "fmt"
  "github.com/jessevdk/go-flags"
  "io"
  "io/ioutil"
  "net/http"
  "net/url"
  "os"
  "path/filepath"
  "regexp"
  "strings"
  "unicode"
)

type Opts struct {
  Directory string `short:"d" long:"directory" description:"The absolute path of the dir to scan, try '-d $PWD'" required:"true"`
  ImageDir  string `short:"i" long:"image-dir" description:"The absolute path of where to put images, try '-i $PWD/images/'" required:"true"`
  CheckOnly bool   `long:"check" description:"Exits non zero on images not hosted by Armory or stored in the repo" required:"false"`
}


func main() {
  var opts Opts
  _, err := flags.Parse(&opts)
  if err != nil {
    os.Exit(1)
  }

  switch {
  case opts.CheckOnly:
    imgUrls := imgsNotHostedByArmory(opts)
    if len(imgUrls) > 0 {
      fmt.Printf("Found %d images that are external to this this repo or Armory.\n\n", len(imgUrls))
      for _, s := range imgUrls {
        fmt.Println(s)
      }
      fmt.Println(`
You can download them by doing:
  docker run -v $(pwd):/src --workdir /src golang:1.12.0 go run -mod=vendor bin/download_images.go -d /src -i /src/images/`)
      os.Exit(1)
    }
  default:
    fmt.Println("Looking for images to download")
    _ = filepath.Walk(opts.Directory, rewriteMarkdownWithSavedImages(opts))
  }

  return
}

const markdownImageUrlRegex = `!\[.*]\((https?://.*)\)`

func imgsNotHostedByArmory(opts Opts) []string {
  var imageUrls []string

  _ = filepath.Walk(opts.Directory, func(filePath string, info os.FileInfo, err error) error {
    if !shouldExploreFilePath(filePath) {
      return nil
    }

    fileContents, _ := ioutil.ReadFile(filePath)

    markdownImageUrlMatch := regexp.MustCompile(markdownImageUrlRegex)

    if markdownImageUrlMatch.Match(fileContents) {
      lines := strings.Split(string(fileContents), "\n")

      for _, line := range lines {
        if markdownImageUrlMatch.MatchString(line) {
          imgs := markdownImageUrlMatch.FindStringSubmatch(line)
          imageUrls = append(imageUrls, imgs[1:]...)
        }
      }
    }
    return nil
  })

  return imageUrls
}

func rewriteMarkdownWithSavedImages(opts Opts) filepath.WalkFunc {
  return func(filePath string, info os.FileInfo, err error) error {
    if !shouldExploreFilePath(filePath) {
      return nil
    }

    fileContents, _ := ioutil.ReadFile(filePath)

    markdownImageUrlMatch := regexp.MustCompile(markdownImageUrlRegex)

    if markdownImageUrlMatch.Match(fileContents) {
      var newFileContents string
      newFilePath := filePath + ".new"
      newFile, _ := os.Create(newFilePath)

      lines := strings.Split(string(fileContents), "\n")

      newLine := ""
      for _, line := range lines {
        newLine = line

        if markdownImageUrlMatch.MatchString(line) {
          urls := markdownImageUrlMatch.FindStringSubmatch(line)
          for _, urlString := range urls[1:] {
            localImgPath := downloadUrl(opts, urlString)

            if localImgPath != "" {
              newLine = strings.Replace(newLine, urlString, localImgPath, -1)
            }
          }
        }

        newFileContents += newLine + "\n"
      }

      // remove all trailing whitespace and add just \n at end of the file
      _, _ = newFile.WriteString(strings.TrimRightFunc(newFileContents, unicode.IsSpace) + "\n")
      _ = os.Rename(newFilePath, filePath)
    }
    return nil
  }
}

func shouldExploreFilePath(filePath string) bool {
  if strings.Contains(filePath, "vendor") {
    return false
  }

  return strings.HasSuffix(filePath, ".md") || strings.HasSuffix(filePath, ".html")
}

// downloadUrl returns relative imagePath
func downloadUrl(opts Opts, urlString string) string {
  u, err := url.Parse(urlString)

  imgUrlPath := strings.Split(u.Path, "/")
  imgDir := strings.TrimSuffix(opts.ImageDir, "/") // remove training slash if it's there

  imgName := imgUrlPath[len(imgUrlPath)-1]
  absImgPath := imgDir + "/" + imgUrlPath[len(imgUrlPath)-1]

  i := strings.Split(strings.TrimSuffix(imgDir, "/"), "/")
  relativeImgPath := i[len(i)-1] + "/" + imgName

  stat, err := os.Stat(absImgPath)
  if err == nil && stat != nil {
    fmt.Printf("exits: %s   as   %s\n", urlString, absImgPath)
    return relativeImgPath
  }

  fmt.Printf("downloading %s   ->   %s\n", urlString, absImgPath)
  resp, err := http.Get(urlString)
  if err != nil || resp.StatusCode > 200 {
    fmt.Printf("ERROR! %s\n", err.Error())
    return ""
  }

  defer func() { _ = resp.Body.Close() }()
  f, _ := os.Create(absImgPath)
  defer func() { _ = f.Close() }()
  _, _ = io.Copy(f, resp.Body)

  fmt.Printf("SAVED!\n")

  return relativeImgPath
}
