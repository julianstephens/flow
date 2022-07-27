package postgres

import (
	"database/sql"
	"fmt"

	"github.com/julianstephens/budget-tracker/server/utils"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

var DB *bun.DB

func init() {
	fmt.Println("Attempting DB connection...")

	dsn := utils.GodotEnv("POSTGRES_URI")

	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))

	DB = bun.NewDB(sqldb, pgdialect.New())

	fmt.Println("DB connected successffully.")
}
