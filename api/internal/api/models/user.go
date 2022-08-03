//Defining the user object

type User struct {
	gorm.model
	ID         int64     `json:"id"`
	Name       string    `json:"name"`
	Email      string    `json:"email"`
	Password   string    `json:"password"`
	Created_at time.Time `json:"created_at"`
	Updated_at time.Time `json:"updated_at"`
}

type UserService interface {
	Create(user *User) error
	Get(id int64) (*User, error)
	GetAll() ([]*User, error)
	Update(user *User) error
	Delete(id int64) error
}