import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getInvite, acceptInvite, rejectInvite} from '../../actions/invites';
import { getParty } from '../../actions/parties';
import { Translate,I18n} from 'react-redux-i18n';
import ga from 'ga-react-router';
import ReactFBLike from 'react-fb-like';
import Helmet from "react-helmet";
import ThemedInvite from './themes/themedInvite';
class InviteShow extends Component {
  componentWillMount() {
    this.props.getInvite(this.props.params.id).then(() => this.props.getParty(this.props.invite.partyId));
  }

  onAcceptClick(event) {
      this.props.acceptInvite(this.props.invite.id);
      ga('send', {
        hitType: 'event',
        eventCategory: 'Invite',
        eventAction: 'Accept'
      });
  }
  onRejectClick(event) {
      this.props.rejectInvite(this.props.invite.id);
      ga('send', {
        hitType: 'event',
        eventCategory: 'Invite',
        eventAction: 'Reject'
      });
  }


  render() {
    const { invite } = this.props;
    const { party } = this.props;
    const { locale } = this.props;
    const statusText = {CREATED: I18n.t('invitePage.inviteSent'),
                        INVITED: I18n.t('invitePage.inviteSent'),
                        ACCEPTED: I18n.t('invitePage.accepted'),
                        REJECTED: I18n.t('invitePage.rejected')};

    if (!invite || !party) {
      return <div className="row"><div className="twelve columns"><Translate value="general.loading" /></div></div>
    }
    ga('set', 'userId', party.hostUser);
    return (
      <div className="row">
        <Helmet
          title={I18n.t('invitePage.title')}
          meta={[
                {"name": "robots", "content": "noindex,nofollow"}
              ]}
        />
      <ThemedInvite invite={invite} party={party} locale={locale}/>

      <h5><Translate value="invitePage.status" />: {statusText[invite.inviteStatus]}</h5>
      <button onClick={this.onAcceptClick.bind(this)} className="button u-full-width accept"><Translate value="invitePage.accept" /></button>
      <button onClick={this.onRejectClick.bind(this)} className="button u-full-width reject"><Translate value="invitePage.reject" /></button>
      {invite.inviteStatus=='ACCEPTED'?<ReactFBLike language={locale=='sv'?'sv_SE':'en_GB'} appId="1114268925305216" href="http://kalas.io"/>:''}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { invite: state.invites.invite, party: state.parties.party, locale: state.i18n.locale};
}

export default connect(mapStateToProps, { getInvite, getParty, acceptInvite, rejectInvite })(InviteShow);
