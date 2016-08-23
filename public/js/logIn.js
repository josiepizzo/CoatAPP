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
     var name = $('#newName').val();
     var zipCode = $('#newZipCode').val();
     var emailAddress = $('#newEmail').val();
     var newPassword = $('#newPassword').val();
     var repeatPassword = $('#repeatPassword').val();
     //creates user in firebase
     if (newPassword === repeatPassword) {
       ref.createUser({
         name: name,
         zipCode: zipCode,
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
             name: name,
             zipCode: zipCode,
             email: emailAddress
           }).done(function(response) {
             location.href = '/dashboard';
           })         
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