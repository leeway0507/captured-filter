package local_file

import (
	"encoding/json"
	"io"
	"log"
	"os"
)

func LoadFile(currPath string) []byte {

	f, err := os.Open((currPath))
	if err != nil {
		log.Fatal(err)
	}

	defer f.Close()

	raw, err := io.ReadAll(f)
	if err != nil {
		log.Fatal(err)
	}

	return raw

}

func LoadJson(currPath string, dataType interface{}) {
	raw := LoadFile(currPath)
	err := json.Unmarshal(raw, &dataType)

	if err != nil {
		log.Fatalf("err | local_file.LoadJson : %v", err)
	}
}
