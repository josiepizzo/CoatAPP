 var ref = new Firebase('https://loginauthenicator.firebaseio.com/');
 $(document).ready(function() {
   //Login page on click functions
   $('.toggle').on('click', function() {
     $('.container').stop().addClass('active');
   });
   $('.close').on('click', function() {
     $('.container').stop().removeClass('active');
   });
   $('#button').on('click', function() {
     var name = $('name').val();
     var zipCode = $('zipCode').val();
     var emailAddress = $('#newEmail').val();
     var newPassword = $('#newPassword').val();
     var repeatPassword = $('#repeatPassword').val();
     //creates user in firebase
     if (newPassword === repeatPassword) {
       ref.createUser({
         name: 'josie',
         zipCode: '12345',
         email: emailAddress,
         password: newPassword
       }, function(error, userData) {
         if (error) {
           console.log("Error creating user:", error);
         } else {
           debugger;
           console.log(
             "Successfully created user account with uid:",
             userData.uid);

           $.post('/create-user', {
             uid: userData.uid,
             name: 'josie',
             zipCode: '12345',
             email: emailAddress
           }).done(function(response) {
             location.href = '/dashboard';
           })
         
// Matt is this the code we would use in the post section?         
          //{
//   "rules": {
//     "users": {
//       "$uid": {
//         // grants write access to the owner of this user account whose uid must exactly match the key ($uid)
//         ".write": "auth !== null && auth.uid === $uid",

//         // grants read access to any user who is logged in with an email and password
//         ".read": "auth !== null && auth.provider === 'password'"
//       }
//     }
//   }
// }

         }

       });
     };
   });
   //References the users and checks for matches email & password
   $('#mainButton').on('click', function() {
     var userEmail = $('#mainEmail').val();
     var userPassword = $('#mainPassword').val();
     ref.authWithPassword({
       email: userEmail,
       password: userPassword
     }, function(error, authData) {
      console.log(error, authData);
       if (error) {
         console.log("Login Failed!", error);
         $('#mainEmail').val('');
         $('#mainPassword').val('');
         $('#mainEmail').val('That is incorrect. Try again.');
       } else {
          $.post('/login', authData).done(function() {
             location.replace('/dashboard');
             console.log("Authenticated successfully with payload:",
               authData);            
           });

       }
     });
   });
 });

//Sending Password Reset Emails - Speak to Matt about this.
//  var ref = new Firebase('https://loginauthenicator.firebaseio.com/');
//   ref.resetPassword({
//   email : "bobtony@firebase.com"
// }, function(error) {
//   if (error === null) {
//     console.log("Password reset email sent successfully");
//   } else {
//     console.log("Error sending password reset email:", error);
//   }
// });