class SessionsController < ApplicationController
  before_filter :create_guest_if_needed, except: [:destroy]
  
  def new
    #automatic sign in by before filter
    redirect_to root_url
  end

  def create
    @user = User.find_by_credentials(params[:user])
    
    if @user
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid email and/or password"]
      render :new
    end
  end

  def destroy
    sign_out!
    redirect_to root_url
  end
end
