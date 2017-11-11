Types::ExerciseType = GraphQL::ObjectType.define do
  name "Exercise"
  field :id, !types.ID
  field :name, !types.String
  field :prompt, !types.String
end
