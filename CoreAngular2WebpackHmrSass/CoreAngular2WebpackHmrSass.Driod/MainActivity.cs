using System;
using Android.App;
using Android.Content;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;
using Auth0.SDK;


namespace CoreAngular2WebpackHmrSass.Driod
{
    [Activity(Label = "CoreAngular2WebpackHmrSass.Driod", MainLauncher = true, Icon = "@drawable/icon")]
    public class MainActivity : Activity
    {
        int count = 1;

        protected override async void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.Main);


            var auth0 = new Auth0Client(
                "fabianwiles.au.auth0.com",
                "JEXaDhlGnxvpvOOjdNTEHvspfK0RHj4u");

            // 'this' could be a Context object (Android) or UIViewController, UIView, UIBarButtonItem (iOS)
            var user = await auth0.LoginAsync(this);
            /*
            - get user email => user.Profile["email"].ToString()
            - get facebook/google/twitter/etc access token => user.Profile["identities"][0]["access_token"]
            - get Windows Azure AD groups => user.Profile["groups"]
            - etc.
            */

            // Get our button from the layout resource,
            // and attach an event to it
            Button button = FindViewById<Button>(Resource.Id.MyButton);

            button.Click += delegate { button.Text = string.Format("{0} clicks!", count++); };
        }
    }
}

