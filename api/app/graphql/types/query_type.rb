Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.


  field :exercises, !types[Types::ExerciseType] do
    resolve -> (obj, args, ctx) { Exercise.all }
  end

  field :exercise do
    type Types::ExerciseType
    argument :id, !types.ID
    description "Find an exercise by ID"
    resolve ->(obj, args, ctx) { Exercise.find(args["id"]) }
  end

  field :tutorials, !types[Types::TutorialType] do
    resolve -> (obj, args, ctx) { Tutorial.all }
  end

  field :tutorial do
    type Types::TutorialType
    argument :id, !types.ID
    description "Find a tutorial by ID"
    resolve ->(obj, args, ctx) {
      Tutorial.find(args["id"])
    }
  end

  field :projects, !types[Types::ProjectType] do
    resolve -> (obj, args, ctx) { Project.all }
  end

  field :project do
    type Types::ProjectType
    argument :id, !types.ID
    resolve ->(obj, args, ctx) {
      Project.find(args["id"])
    }
  end

  field :user do
    type Types::UserType
    argument :id, !types.ID
    resolve ->(obj, args, ctx) {
      User.find(args["id"])
    }
  end
end
