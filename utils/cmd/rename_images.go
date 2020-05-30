package main

import (
  "github.com/jessevdk/go-flags"
  log "github.com/sirupsen/logrus"
  "io/ioutil"
  "os"
  "path/filepath"
  "strings"
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

  imgPaths := getImagePaths(err, opts)
  renamed := getNewImageNames(imgPaths)
  err = renameImage(renamed)
  if err != nil {
    log.Fatal(err)
  }

  err = replaceContents(err, opts, renamed)
  if err != nil {
    log.Error("")
    log.Fatal(err)
  }
}

func replaceContents(err error, opts Opts, renamed []imageRename) error {
  err = filepath.Walk(opts.Directory, func(path string, info os.FileInfo, err error) error {
    fileContents, _ := ioutil.ReadFile(path)
    permissions, err := os.Stat(path)
    if err != nil {
      return err
    }

    c := string(fileContents)
    for _, r := range renamed {
      c = strings.ReplaceAll(c, r.OldFileName, r.NewFileName)
    }

    err = ioutil.WriteFile(path, []byte(c), permissions.Mode())
    if err != nil {
      log.Error("cannot rename file")
      return err
    }

    return nil
  })
  return err
}

func renameImage(renamed []imageRename) error {
  for _, r := range renamed {
    if r.NewFileName == r.OldFileName {
      continue
    }

    err := os.Rename(r.Folder+string(os.PathSeparator)+r.OldFileName, r.Folder+string(os.PathSeparator)+r.NewFileName)
    if err != nil {
      log.Errorf("could not rename image from\n'%s'\nto\n'%s'", r.OldFileName, r.NewFileName)
      return err
    }
  }
  return nil
}

func getImagePaths(err error, opts Opts) []string {
  imgPaths := []string{}
  err = filepath.Walk(opts.ImageDir, func(path string, info os.FileInfo, err error) error {
    if info.IsDir() {
      return nil
    }

    imgPaths = append(imgPaths, path)
    return nil
  })
  if err != nil {
    log.Fatalf("unable to get a list of images, %s", err)
  }
  return imgPaths
}

func getNewImageNames(imgPaths []string) []imageRename {
  var renamed []imageRename
  for _, path := range imgPaths {
    img := imageRename{}

    parts := strings.Split(path, string(os.PathSeparator))
    img.OldFileName = parts[len(parts)-1]
    img.NewFileName = strings.ReplaceAll(img.OldFileName, " ", "-")
    img.Folder = strings.ReplaceAll(path, string(os.PathSeparator)+img.OldFileName, "") // please don't do /path/path/name.png/name.png -_-

    renamed = append(renamed, img)
  }
  return renamed
}

type imageRename struct {
  Folder      string
  OldFileName string
  NewFileName string
}
