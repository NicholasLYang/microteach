Types::BlockType = GraphQL::ObjectType.define do
  name "Block"
  field :id, !types.ID
  field :code, !types.String
end
