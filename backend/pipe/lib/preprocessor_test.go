package pipe

import (
	"backend/lib/envset"
	"path/filepath"
	"testing"
)

func Test_Load(t *testing.T) {
	envset.Load(".env.dev")
	t.Run("Test_Load_Raw_File", func(t *testing.T) {
		storeName := "test_store"
		searchType := "list"
		fileName := "test.json"
		filePath := filepath.Join("data", "raw", storeName, searchType, fileName)
		d := LoadFile[[]RawProduct](filePath)
		if len(*d) == 0 {
			t.Error("Test_Load_Raw_File empty json")
		}
	})

}

func Test_Preprocess(t *testing.T) {
	envset.Load(".env.dev")
	processor := NewPreProcessor()
	storeName := "test_store"
	searchType := "list"
	fileName := "test.json"
	filePath := filepath.Join("data", "raw", storeName, searchType, fileName)

	d := LoadFile[[]RawProduct](filePath)
	t.Run("Test_Preprocess", func(t *testing.T) {
		p := processor.Preprocess(d)
		if len(*d) != len(p) {
			t.Fatal("Preprocess Error")
		}
	})
	t.Run("Test Save Preprocess Data", func(t *testing.T) {
		p := processor.Preprocess(d)
		processor.Save(p, storeName, searchType, fileName)
	})
	t.Run("Test Execute Run", func(t *testing.T) {
		processor.Run(storeName, searchType, fileName)
	})
	t.Run("Test MapKorBrand", func(t *testing.T) {
		brandName := "adidas"
		processor.MapKorBrand(brandName)
	})
}
