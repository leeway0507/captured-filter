package store

import (
	"backend/db"
	"backend/ent"
	"backend/ent/store"
	"context"
)

func GetStores(ctx context.Context, session *ent.Client,
) ([]*ent.Store, error) {
	return session.Store.Query().All(ctx)
}

func GetStore(ctx context.Context, session *ent.Client, id string,
) (*ent.Store, error) {
	return session.Store.Query().Where(store.IDEQ(id)).First(ctx)
}

func CreateStore(ctx context.Context, session *ent.Client, storeData *ent.Store) error {
	createStoreRow := db.CreateStoreRow(session, ctx, storeData)

	_, err := createStoreRow.Save(ctx)

	if err != nil {
		return err
	}
	return nil
}
