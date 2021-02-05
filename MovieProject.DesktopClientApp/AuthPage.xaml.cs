using MovieProject.DesktopClientApp.Core.Globals;
using MovieProject.DesktopClientApp.Core.Models;
using MovieProject.DesktopClientApp.Core.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at https://go.microsoft.com/fwlink/?LinkId=234238

namespace MovieProject.DesktopClientApp
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class AuthPage : Page
    {
        public AuthPage()
        {
            this.InitializeComponent();
        }

        private async void Button_Click(object sender, RoutedEventArgs e)
        {
            Login user = new Login();
            user.Email = email.Text;
            user.Password = password.Password;
            var result = await AuthService.LoginAsync(user);
            if(result.Token != null && result.Status == 200)
            {
                var stream = result.Token;
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(stream);
                var tokenS = handler.ReadToken(stream) as JwtSecurityToken;
                Globals.Token = result.Token;
                Globals.Id = tokenS.Claims.First(claim => claim.Type == "id").Value;
                Globals.Email = tokenS.Claims.First(claim => claim.Type == "email").Value;
                Frame.Navigate(typeof(MainPage));


            }
            else
            {
                ContentDialog dialog = new ContentDialog();
                dialog.CloseButtonText = "Ok";
                dialog.Content = "Email or password is invalid";
                dialog.Title = "Error! Bad input";
                email.Text = String.Empty;
                password.Password = String.Empty;
                await dialog.ShowAsync();
            }
        }
    }
}
