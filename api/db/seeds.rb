# coding: utf-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

prompt = "<h1><a id=\"Hash_Algorithm_0\"></a>Hash Algorithm</h1>
<p>Hashing algorithms are one of the core tools in password security. They are functions that take an input (or ‘message’) and returns a fixed-size alphanumeric string. The string is called the ‘hash value’, ‘message digest’, ‘digital fingerprint’, ‘digest’ or ‘checksum’).</p>
<p>The ideal hash function has three main properties:</p>
<ul>
<li>It is extremely easy to calculate a hash for any given data.</li>
<li>It is extremely computationally difficult to calculate an alphanumeric text that has a given hash.</li>
<li>It is extremely unlikely that two slightly different messages will have the same hash.</li>
</ul>
<p>For this exercise, you are going to implement the <code>bcrypt</code> hashing algorithm for user registration. The input is a password, a string. The output should be the password hashed with bcrypt.</p>
"

User.create({ email: "nick@nicholasyang.com", id: 1 })
tutorial = Tutorial.create({ name: "Make your own Blog", author: 1 })
Exercise.create({ prompt: prompt, name: "Hash Exercise", tutorial_id: tutorial.id })
