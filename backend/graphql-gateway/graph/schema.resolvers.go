package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/daritelska-platforma/graphql-gateway/graph/generated"
	"github.com/daritelska-platforma/graphql-gateway/graph/model"
)

func (r *mutationResolver) CreateAccount(ctx context.Context, input model.CreateAccount) (*model.Account, error) {
	panic(fmt.Errorf("CreateAccount not implemented"))
}

func (r *mutationResolver) CreateCampaign(ctx context.Context, input model.CreateCampaign) (*model.Campaign, error) {
	panic(fmt.Errorf("CreateCampaign not implemented"))
}

func (r *queryResolver) Campaigns(ctx context.Context) ([]*model.Campaign, error) {
	panic(fmt.Errorf("Campaigns not implemented"))
}

func (r *queryResolver) Accounts(ctx context.Context) ([]*model.Account, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
