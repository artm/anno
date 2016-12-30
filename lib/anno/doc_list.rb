module Anno
  class DocList
    class << self
      def for account
        Doc.all
      end
    end
  end
end
