# JWT-AUT

jwt-authentication ,like otp verification
📂 Mongoose Models

        1. UserModel

            Stores user account information.

            const userSchema = new mongoose.Schema({
            username: { type: String, required: true, unique: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            verified: { type: Boolean, default: false }
            });

            username → must be unique.

            email → must be unique.

            password → stored as a bcrypt hash.

            verified → boolean flag for email verification.

        2. SessionModel

            Tracks user sessions for refresh tokens.

            const sessionSchema = new mongoose.Schema({
            user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
            refreshTokenHash: { type: String, required: true },
            ip: { type: String, required: true },
            userAgent: { type: String, required: true },
            revoked: { type: Boolean, default: false }
            }, { timestamps: true });


            user → reference to UserModel.

            refreshTokenHash → hashed refresh token.

            ip → client IP address.

            userAgent → browser/device info.

            revoked → marks session invalid.

            timestamps → auto adds createdAt and updatedAt.

        3. OtpModel

        Stores OTPs for email verification and password reset.

            const otpSchema = new mongoose.Schema({
            email: { type: String, required: true },
            user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
            otpHash: { type: String, required: true },
            purpose: { type: String, enum: ["email-verification", "password-reset"], required: true },
            createdAt: { type: Date, default: Date.now, expires: 300 } // auto-delete after 5 minutes
            }, { timestamps: true });
  

            email → user’s email.

            user → reference to UserModel.

            otpHash → hashed OTP.

            purpose → either email-verification or password-reset.

            createdAt → TTL index, auto-deletes after 5 minutes.

📂 Controller Functions (Step-by-Step)

Register
            Check if username/email exists.

            Hash password with bcrypt.

            Create user.

            Generate OTP, hash, send via email.

            Save OTP in DB (expires in 5 min).

            Return success.

Login

            Find user by email.

            Ensure verified.

            Compare password with bcrypt.

            Generate refresh token (7 days).

            Save session with hashed refresh token.

            Generate access token (15 min).

            Return tokens + user info.

GetMe

            Extract access token from header.

            Verify JWT.

            Find user by ID.

            Return user info.

RefreshToken

            Get refresh token from cookie.

            Verify JWT.

            Find session by hashed refresh token.

            Generate new access + refresh tokens.

            Save new refresh token hash.

            Return new tokens.

Logout

            Get refresh token from cookie.

            Hash and revoke session.

            Clear cookie.

            Return success.

LogoutAll
            Verify refresh token.

            Revoke all sessions for user.

            Clear cookie.

            Return success.

VerifyEmail

            Hash OTP from request.

            Find OTP doc by email + hash.

            Check expiry (createdAt + 5 min).

            Mark user as verified.

            Delete OTPs.

            Return success.

ResendOtp

            Find user by email.

            Delete old OTPs.

            Generate new OTP, hash, send email.

            Save OTP in DB.

            Return success.

ForgotPassword

            Find user by email.

            Delete old reset OTPs.

            Generate new OTP, hash, send email.

            Save OTP in DB.

            Return success.

VerifyResetOtp

            Hash OTP from request.

            Find OTP doc by email + hash.

            Check expiry (createdAt + 5 min).

            Generate reset JWT (10 min).

            Save resetToken in cookie.

            Return success.

 ResetPassword

            Compare newPassword and confirmPassword.

            Verify resetToken from cookie.

            Hash new password with bcrypt.

            Update user password.

            Delete reset OTPs.

            Clear resetToken cookie.

            Return success.            



📂 Routes
Method	       URL	                         Controller	                Purpose

POST	/api/auth/register	                 register	                Register new user
POST	/api/auth/login                      login                   	Login user
GET	    /api/auth/me	                     getMe	                    Get current user info
POST	/api/auth/refresh-token	             refreshToken	            Refresh access token
POST	/api/auth/logout	                 logout	                    Logout current session
POST	/api/auth/logout-all	             logoutAll	                Logout all sessions
POST	/api/auth/email/verify	             verifyEmail	            Verify email OTP
POST	/api/auth/otp/resend	             resendOtp	                Resend OTP
POST	/api/auth/password/forgot	         forgotPassword	            Send reset OTP
POST	/api/auth/password/verify-otp        verifyResetOtp	            Verify reset OTP
POST	/api/auth/password/reset	         resetPassword	             Reset password