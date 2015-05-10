class UsersController < ApplicationController
  before_filter :create_guest_if_needed, except:[:index]
  def new
    #automatic sign in by before filter
    redirect_to root_url
  end

  def create
    
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
