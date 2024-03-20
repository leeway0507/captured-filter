package customslice

import (
	"backend/ent"
	"backend/lib/envset"
	"backend/lib/local_file"
	"backend/lib/testutil"
	"os"
	"path/filepath"
	"testing"
)

func Test_Custom_Array(t *testing.T) {
	envset.Load(".env.dev")
	mockPath := os.Getenv("MOCK_DATA")
	var filePath = filepath.Join(mockPath, "db", "product_50.json")
	d, err := local_file.LoadJson[[]ent.Product](filePath)
	if err != nil {
		t.Fatal("Product error")
	}
	t.Run("Test UniqueSliceElement", func(t *testing.T) {

		got := UniqueSliceElements[ent.Product, string](*d, func(p ent.Product) string {
			return p.Brand
		})
		want := []string{"adidas_first", "adidas_second", "adidas_third", "adidas"}
		testutil.Equal(t, got, want)

	})

}
