json.boards @boards do |board|
  json.extract! board, :id, :user_id, :title, :created_at, :updated_at
  
  json.email board.user.email
end