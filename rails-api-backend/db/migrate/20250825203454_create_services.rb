class CreateServices < ActiveRecord::Migration[8.0]
  def change
    create_table :services do |t|
      t.string :name
      t.text :description
      t.text :code
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :services, [:user_id, :name], unique: true
  end
end
