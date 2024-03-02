package pipe

import (
	"backend/lib/envset"
	"testing"
)

func Test_Load(t *testing.T) {
	envset.Load(".env.dev")
	processor := NewPreProcessor()
	t.Run("Test_Load_Raw_File", func(t *testing.T) {
		brandName := "consortium"
		searchType := "list"
		fileName := "240301T114129.json"
		d := processor.loadFile(brandName, searchType, fileName)
		if len(*d) == 0 {
			t.Error("Test_Load_Raw_File empty json")
		}
	})

}

func Test_Preprocess(t *testing.T) {
	envset.Load(".env.dev")
	processor := NewPreProcessor()
	brandName := "consortium"
	searchType := "list"
	fileName := "240301T114129.json"
	d := processor.loadFile(brandName, searchType, fileName)
	p := processor.Preprocess(d)
	t.Run("Test_Preprocess", func(t *testing.T) {
		if len(*d) != len(p) {
			t.Fatal("Preprocess Error")
		}
	})
	t.Run("Test Save Preprocess Data", func(t *testing.T) {
		processor.Save(p, brandName, searchType, fileName)
	})
	t.Run("Test Execute Run", func(t *testing.T) {
		processor.Run(brandName, searchType, fileName)
	})
}
