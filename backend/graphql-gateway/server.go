package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/daritelska-platforma/graphql-gateway/graph"
	"github.com/daritelska-platforma/graphql-gateway/graph/generated"
	"github.com/daritelska-platforma/graphql-gateway/pb/account"
	"github.com/kelseyhightower/envconfig"
	"google.golang.org/grpc"
)

type AppConfig struct {
	Port       string `envconfig:"PORT"`
	AccountUrl string `envconfig:"ACCOUNT_SERVICE_URL"`
}

type Client struct {
	conn    *grpc.ClientConn
	service account.AccountServiceClient
}

func NewClient(url string) (*Client, error) {
	fmt.Println("Dial: " + url)
	conn, err := grpc.Dial(url, grpc.WithInsecure())
	if err != nil {
		return nil, err
	}
	service := account.NewAccountServiceClient(conn)
	return &Client{conn, service}, nil
}

func (c *Client) Close() {
	c.conn.Close()
}

func main() {
	var cfg AppConfig
	err := envconfig.Process("", &cfg)
	if err != nil {
		log.Fatal(err)
	}

	accountClient, err := NewClient(cfg.AccountUrl)
	if err != nil {
		panic(err)
	}

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(
		generated.Config{
			Resolvers: &graph.Resolver{
				AccountClient: accountClient.service,
			},
		}),
	)

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", cfg.Port)
	log.Fatal(http.ListenAndServe(":"+cfg.Port, nil))
}
