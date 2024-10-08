package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
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
	http.Handle("/", http.FileServer(http.Dir(".")))
	http.HandleFunc("/data", giveKanji)
	http.HandleFunc("/data/all", giveFull)

	// Start the server
	fmt.Println("started server at http://localhost:8080")
	must(http.ListenAndServe(":8080", nil))
}

func giveFull(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	must(json.NewEncoder(w).Encode(data))
}

func giveKanji(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	id := r.Form.Get("id")
	// fmt.Println(id)

	for k, v := range data {
		if v.Id == id {
			w.WriteHeader(http.StatusOK)
			must(json.NewEncoder(w).Encode(data[k]))
			return
		}
	}

	w.WriteHeader(http.StatusNotFound)
}

func must(err error) {
	if err != nil {
		panic(err)
	}
}
