class CreateFunctions < ActiveRecord::Migration[8.0]
  def change
    create_table :functions do |t|
      t.string :name
      t.text :code
      t.json :parameters
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
