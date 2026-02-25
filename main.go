package main

import (
	"fmt"
	"net/http"
	"strings"
)

func main() {
	// Register the respective handlers
	http.HandleFunc("/", serve_files)

	// Start the server
	fmt.Println("started server at http://localhost:8080/")
	must(http.ListenAndServe(":8080", nil))
}

func serve_files(w http.ResponseWriter, r *http.Request) {
	if strings.HasPrefix(r.URL.Path, "/") {
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
