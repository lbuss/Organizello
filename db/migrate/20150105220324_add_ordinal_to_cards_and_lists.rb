class AddOrdinalToCardsAndLists < ActiveRecord::Migration
  def change
    add_column :lists, :ordinal, :integer
    add_column :cards, :ordinal, :integer
  end
end
