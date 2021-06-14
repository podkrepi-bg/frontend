package graph

import "github.com/podkrepi-bg/graphql-gateway/pb/account"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	AccountClient account.AccountServiceClient
}
