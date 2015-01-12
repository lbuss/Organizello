class StaticPagesController < ApplicationController
  before_filter :create_guest_if_needed

  def root; end
end
