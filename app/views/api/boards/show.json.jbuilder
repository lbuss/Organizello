json.extract! @board, :id, :user_id, :title, :created_at, :updated_at

json.members @board.members do |member|
  json.id member.id
  json.email member.email
  json.gravatar_url member.gravatar_url
end

json.lists @board.lists do |list|
  json.extract! list, :id, :title, :ordinal, :created_at, :updated_at

  json.cards list.cards do |card|
    json.extract! card, :id, :title, :description, :ordinal, :created_at, :updated_at
    
    json.items card.items do |item|
      json.extract! item, :id, :title, :done, :created_at, :updated_at
    end
  end
end
