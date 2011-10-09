class AddInboudOutboundToCommunications < ActiveRecord::Migration
  def self.up
    add_column :communications, :inbound, :integer, :default => 0
  end

  def self.down
    remove_column :communications, :inbound
  end
end
