package pipe

import (
	"backend/lib/envset"
	"backend/lib/testutil"
	"context"
	"testing"
)

func Test_DB_Uploader(t *testing.T) {
	envset.Load(".env.dev")
	u := Uploader{}

	t.Run("Test_Load_Preprocess_File", func(t *testing.T) {
		brandName := "test_store"
		searchType := "list"
		fileName := "240229T142201.json"
		d := u.loadFile(brandName, searchType, fileName)
		if len(*d) == 0 {
			t.Error("Test_Load_Preprocess_File Error")
		}
		t.Logf("%+v\n\n", (*d)[0])
	})

	t.Run("Test_Upload_DB", func(t *testing.T) {
		session := testutil.MockDB(t)
		ctx := context.Background()

		testutil.LoadStoreDataForForegnKey(t, session, ctx)

		DB_Uploader := &DB{Session: session}
		u.uploader = DB_Uploader
		storeName := "test_store"
		searchType := "list"
		fileName := "240229T142201.json"
		d := u.loadFile(storeName, searchType, fileName)
		u.Upload(storeName, d)

		q, err := session.Product.Query().First(ctx)
		if err != nil {
			t.Fatal(err.Error())
		}
		t.Log(q)

	})

}
