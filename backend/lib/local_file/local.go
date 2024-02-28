package local_file

import (
	"encoding/json"
	"io"
	"os"
)

func LoadFile(currPath string) ([]byte, error) {
	f, err := os.Open(currPath)
	if err != nil {
		return nil, err
	}

	defer f.Close()

	raw, err := io.ReadAll(f)
	if err != nil {
		return nil, err
	}

	return raw, err

}

func LoadJson(currPath string, dataType interface{}) error {
	raw, err := LoadFile(currPath)
	if err != nil {
		return err
	}

	err = json.Unmarshal(raw, &dataType)
	if err != nil {
		return err
	}

	return nil
}
