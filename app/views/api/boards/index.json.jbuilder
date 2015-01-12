json.boards @boards do |board|
  json.extract! board, :id, :user_id, :title, :created_at, :updated_at
  
  json.members board.members do |member|
    json.id member.id
    json.email member.email
  end
  
  json.email board.user.email
end