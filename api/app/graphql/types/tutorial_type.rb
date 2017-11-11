Types::TutorialType = GraphQL::ObjectType.define do
  name "Tutorial"
  field :id, !types.ID
  field :name, !types.String
  field :author, !Types::UserType
  field :exercises, types[Types::ExerciseType]
end
