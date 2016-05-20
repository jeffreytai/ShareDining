namespace :messages do
  desc "Adds 11 messages to jeffrey94 from testuser1"
  task :add11 => :environment do
    recipients = User.find_by(id: 1)
    sender = User.find_by(id: 2)
    sender.send_message(recipients, "Hi! I'm interested in renting your kitchen next Friday, but I have some questions about ..... more words to make this a longer message...just to see what it looks like...lalalala ok. long enough now", "message subject")
    sender.send_message(recipients, "body 2", "subject 2")
    sender.send_message(recipients, "body 3", "subject 3")
    sender.send_message(recipients, "body 4", "subject 4")
    sender.send_message(recipients, "body 5", "subject 5")
    sender.send_message(recipients, "body 6", "subject 6")
    sender.send_message(recipients, "body 7", "subject 7")
    sender.send_message(recipients, "body 8", "subject 8")
    sender.send_message(recipients, "body 9", "subject 9")
    sender.send_message(recipients, "body 10", "subject 10")
    sender.send_message(recipients, "body 11", "subject 11")
  end
end
