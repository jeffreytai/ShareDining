Rails.application.routes.draw do

  root 'landing#user'

  devise_for :users,
             :controllers => {
                sessions: 'sessions', registrations: 'registrations'
             }

  get 'landing/terms_of_use'
  get 'landing/privacy_policy'
  get 'landing/cookie_policy'
  get 'landing/usage_agreement'
  get 'landing/the_kitchen_economy'
  get 'landing/help'

  get 'dashboard' => 'account#show'
  post 'account/payment'

  get 'search/results'
  post 'kitchen/create'

  resources :kitchen do
    match "reservation/new" => "reservation#new", via: :post
    resources :reservation, only: [:create, :show]
    resources :availability, only: :create
  end

  resources :reservation, only: [:edit, :update, :destroy]
  resources :availability, only: [:new, :show, :edit, :update, :destroy]

  # resources :charges, only: [:new, :create]

  scope '/api' do
    scope '/v1' do
      get '/kitchens' => 'kitchen#filter'
    end
  end

  resources :conversations, only: [:index, :destroy] do
    # removed :show
    member do
      post :reply
    end
    member do
      post :restore
    end
    member do
      post :mark_as_read
    end
    collection do
      delete :empty_trash
    end
  end

  resources :messages, only: [:new, :create]


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
