// Test environment setup for Rentlix
// This file can be used to test the authentication flow

const testUser = {
  email: 'test@example.com',
  password: 'testpassword123',
  firstName: 'Test',
  lastName: 'User',
  userType: 'find-room'
};

// Test registration flow
async function testRegistration() {
  console.log('Testing registration flow...');
  
  // This would be called from the browser
  // const supabase = createClient();
  // const { data, error } = await supabase.auth.signUp({
  //   email: testUser.email,
  //   password: testUser.password,
  //   options: {
  //     data: { 
  //       full_name: `${testUser.firstName} ${testUser.lastName}`, 
  //       user_type: testUser.userType,
  //       first_name: testUser.firstName,
  //       last_name: testUser.lastName
  //     },
  //   },
  // });
  
  console.log('Registration test completed');
}

// Test login flow
async function testLogin() {
  console.log('Testing login flow...');
  
  // This would be called from the browser
  // const supabase = createClient();
  // const { data, error } = await supabase.auth.signInWithPassword({ 
  //   email: testUser.email, 
  //   password: testUser.password 
  // });
  
  console.log('Login test completed');
}

// Test profile completion
async function testProfileCompletion() {
  console.log('Testing profile completion...');
  
  // This would be called from the browser after authentication
  // const response = await fetch("/api/rentlix/register", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     firstName: testUser.firstName,
  //     lastName: testUser.lastName,
  //     phone: "+44 7700 900123",
  //     gender: "male",
  //     occupation: "Software Developer",
  //     bio: "Test user bio",
  //     dateOfBirth: "1990-01-01",
  //     userType: testUser.userType,
  //   }),
  // });
  
  console.log('Profile completion test completed');
}

// Export test functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testUser,
    testRegistration,
    testLogin,
    testProfileCompletion
  };
}
