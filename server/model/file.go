package model

type File struct {
	Base
	FileName string `json:"fileName" binding:"required"`
	FileURL  string `json:"fileURL" binding:"required"`
}

func (u *File) TableName() string {
	return "file"
}
