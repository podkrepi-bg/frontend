package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/podkrepi-bg/graphql-gateway/graph/generated"
	"github.com/podkrepi-bg/graphql-gateway/graph/model"
	"github.com/podkrepi-bg/types/go-types/account"
)

func (r *mutationResolver) CreateAccount(ctx context.Context, input account.CreateAccountRequest) (*account.Account, error) {
	return r.Resolver.AccountClient.CreateAccount(ctx, &input)
}

func (r *mutationResolver) CreateCampaign(ctx context.Context, input model.CreateCampaign) (*model.Campaign, error) {
	panic(fmt.Errorf("CreateCampaign not implemented"))
}

func (r *queryResolver) Campaigns(ctx context.Context) ([]*model.Campaign, error) {
	panic(fmt.Errorf("Campaigns not implemented"))
}

func (r *queryResolver) Accounts(ctx context.Context) ([]*account.Account, error) {
	resp, err := r.Resolver.AccountClient.ListAccounts(ctx, &account.ListAccountsRequest{})
	return resp.Accounts, err
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
