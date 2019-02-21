package main

import (
  "fmt"
  "github.com/jessevdk/go-flags"
  "io"
  "io/ioutil"
  "net/http"
  "net/url"
  "os"
  "path"
  "path/filepath"
  "regexp"
  "strings"
)

type Opts struct {
  Directory string `short:"d" long:"directory" description:"The absolute path of the dir to scan" required:"true"`
  ImageDir  string `short:"i" long:"image-dir" description:"The absolute path of where to put images" required:"true"`
}

func main() {
  var opts Opts

  _, err := flags.Parse(&opts)
  if err != nil {
    os.Exit(1)
  }

  _ = filepath.Walk(opts.Directory, func(filePath string, info os.FileInfo, err error) error {
    if !strings.Contains(filePath, ".md") && !strings.Contains(filePath, ".html") {
      return nil
    }

    fileContents, _ := ioutil.ReadFile(filePath)

    markdownImageUrlMatch := regexp.MustCompile(`!\[.*\]\((https?://.*)\)`)

    if markdownImageUrlMatch.Match(fileContents) {
      lines := strings.Split(string(fileContents), "\n")

      newFile, _ := os.Create(path.Base(filePath) + ".new")

      newLine := ""
      for _, line := range lines {
        newLine = line

        if markdownImageUrlMatch.MatchString(line) {
          urls := markdownImageUrlMatch.FindStringSubmatch(line)
          for _, urlString := range urls[1:] {
            localImgPath := downloadUrl(opts, urlString)

            newLine = strings.Replace(newLine, urlString, localImgPath, -1)
          }
        }

        _, _ = newFile.WriteString(newLine + "\n")
      }

    }
    return nil
  })

  return
}

// returns relative imagePath
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

  fmt.Printf("downloading %s   ->   %s", urlString, absImgPath)
  resp, err := http.Get(urlString)
  if err != nil || resp.StatusCode > 200 {
    return ""
  }
  defer resp.Body.Close()
  f, _ := os.Create(absImgPath)
  defer f.Close()
  _, _ = io.Copy(f, resp.Body)

  fmt.Println("  saved!")

  return relativeImgPath
}
