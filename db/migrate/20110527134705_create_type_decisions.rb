class CreateTypeDecisions < ActiveRecord::Migration
  def self.up
    create_table :type_decisions do |t|
      t.string :description
      t.text :commentaires

      t.timestamps
    end
  end

  def self.down
    drop_table :type_decisions
  end
end
