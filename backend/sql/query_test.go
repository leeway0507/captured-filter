package sql

import (
	"backend/db"
	"context"
	"database/sql"
	"testing"

	_ "github.com/go-sql-driver/mysql"
)

func Test_SQL_QUERY(t *testing.T) {
	dbUrl := db.DBUrl()
	db, err := sql.Open("mysql", dbUrl)
	if err != nil {
		t.Fatal(err)
	}

	queries := New(db)

	ctx := context.Background()

	t.Run("Test_GetProduct", func(t *testing.T) {
		q, err := queries.GetProduct(ctx)
		if err != nil {
			t.Fatal(err)
		}
		t.Error(len(q))
	})

}
