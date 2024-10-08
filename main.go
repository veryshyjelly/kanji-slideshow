package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
)

type Word struct {
	Id      string `json:"#"`
	Kanji   string `json:"kanji"`
	Keyword string `json:"keyword"`
	Story   string `json:"story"`
	Comment string `json:"comment"`
}

var data []Word

func main() {
	// Open the file containing all the data
	file, err := os.Open("data.json")
	must(err)

	// Unmarshal the data into struct
	err = json.NewDecoder(file).Decode(&data)
	must(err)

	// Register the respective handlers
	http.HandleFunc("/", serve_files)

	// Start the server
	fmt.Println("started server at http://localhost:8080/kanji-slideshow")
	must(http.ListenAndServe(":8080", nil))
}

func serve_files(w http.ResponseWriter, r *http.Request) {
	if strings.HasPrefix(r.URL.Path, "/kanji-slideshow") {
		http.ServeFile(w, r, "./"+r.URL.Path[16:])
	} else {
		http.NotFound(w, r)
	}
}

func must(err error) {
	if err != nil {
		panic(err)
	}
}
