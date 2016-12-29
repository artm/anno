class Account < Couchbase::Model

  attribute :name
  attribute :email

  def self.find_or_create_from_auth_hash(hash)
    account = Account.find_by_id(hash[:uid])
    unless account
      account = Account.create!(
        id: hash[:uid],
        name: hash[:info][:name],
        email: hash[:info][:email])
    end
    account
  end
end
