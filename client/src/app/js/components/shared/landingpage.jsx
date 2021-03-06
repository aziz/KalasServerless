import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";
import './landingpage.css';

import { Translate,I18n} from 'react-redux-i18n';
import ThemedInvite from '../invites/themes/themedInvite';
import {throwError} from '../../actions/error';

class LandingPage extends Component {

componentWillMount() {
  if(navigator.userAgent.indexOf("SAMSUNG")!=-1){
    this.props.throwError("Klickade du precis på en länk i ett SMS? Samsungs webbläsare för SMS fungerar dåligt. Vänligen öppna länken i den valiga webbläsaren. Det gör du genom att klicka på MER i högra hörnet, följt av Öppna i webbläsare. Fungerar inte det så försök öppna länken i en annan webbläsare, tex i en annan telefon eller dator.");
  }
}

getDummyParty(theme){
  const name = theme=="polka"?"Amir":"Anna"
  return {
    header:theme=="ladybug"?I18n.t('theme.dummyParty.header1',{name:name}):I18n.t('theme.dummyParty.header2',{name:name}),
    description:theme=="bowling"?I18n.t('theme.dummyParty.description1'):I18n.t('theme.dummyParty.description2',{name:name}),
    startDateTime:"2016-12-06: 18.00",
    endDateTime: "20:00",
    partyLocation: theme=="bowling"?"John Scott's, Partille Arena":"Kungsgatan 23, Göteborg",
    theme:theme
  }
}
getDummyInvite(){
  return {childName:"Lisa"}
}
setThemeBackground(currentTheme){

}


  render() {
    const {currentUser} = this.props;

    return (
      <div>
        <div className="section">
            <div className="row first">
              <div className="twelve columns">
                <h4 className="heading"><Translate value="landingPage.heading" /></h4>
                <p className="description"><Translate value="landingPage.description" /></p>
                <p>
                  <Link to={'/parties/new'} className="button button-primary"><Translate value="landingPage.newPartyButton" /></Link>
                </p>
              </div>
            </div>
        </div>
        <div className="section">
            <div className="row second">
              <div className="twelve columns">
                <h4 className="heading"><Translate value="landingPage.howItWorks" /></h4>
                <p className="description"><Translate value="landingPage.howItWorksDetails1" /></p>
                <p className="description"><Translate value="landingPage.howItWorksDetails2" /></p>
                <p className="description"><Translate value="landingPage.howItWorksDetails3" /></p>
                <p className="description"><Translate value="landingPage.howItWorksDetails4" /></p>
                <p>
                  <Link to={'/parties/new'} className="button button-primary"><Translate value="landingPage.newPartyButton" /></Link>
                </p>
                <p className="description"><Translate value="landingPage.themes" /></p>

              </div>
            </div>
        </div>
        <div className="row">
          <div className="four columns polka themePreview" >
            <ThemedInvite party={this.getDummyParty("polka")} invite={this.getDummyInvite()} locale={this.props.locale} setBackground={this.setThemeBackground.bind(this)}/>
          </div>
          <div className="four columns bowling themePreview" >
            <ThemedInvite party={this.getDummyParty("bowling")} invite={this.getDummyInvite()} locale={this.props.locale} setBackground={this.setThemeBackground.bind(this)}/>
          </div>
          <div className="four columns ladybug themePreview" >
            <ThemedInvite party={this.getDummyParty("ladybug")} invite={this.getDummyInvite()} locale={this.props.locale} setBackground={this.setThemeBackground.bind(this)}/>
          </div>
          <div className="section">
            <div className="twelve columns">
              <Link to={'/parties/new'} className="button button-primary"><Translate value="landingPage.newPartyButton" /></Link>
            </div>
          </div>
        </div>
      </div>
  );
  }
}
function mapStateToProps(state) {
  return { currentUser: state.users.currentUser,locale: state.i18n.locale};
}

export default connect(mapStateToProps, {throwError})(LandingPage);
