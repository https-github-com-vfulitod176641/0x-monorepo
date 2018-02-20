import * as _ from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Deco, Key, WebsitePaths } from 'ts/types';
import { colors } from 'ts/utils/colors';
import { constants } from 'ts/utils/constants';
import { Translate } from 'ts/utils/translate';

interface MenuItemsBySection {
    [sectionName: string]: FooterMenuItem[];
}

interface FooterMenuItem {
    title: string;
    path?: string;
    isExternal?: boolean;
}

const ICON_DIMENSION = 16;

const linkStyle = {
    color: colors.white,
    cursor: 'pointer',
};

const titleToIcon: { [title: string]: string } = {
    'Rocket.chat': 'rocketchat.png',
    Blog: 'medium.png',
    Twitter: 'twitter.png',
    Reddit: 'reddit.png',
    Forum: 'discourse.png',
};

export interface FooterProps {
    translate?: Translate;
}

interface FooterState {}

export class Footer extends React.Component<FooterProps, FooterState> {
    public static defaultProps: Partial<FooterProps> = {
        translate: new Translate(),
    };
    public render() {
        const menuItemsBySection: MenuItemsBySection = {
            [Key.Documentation]: [
                {
                    title: '0x.js',
                    path: WebsitePaths.ZeroExJs,
                },
                {
                    title: this.props.translate.get(Key.SmartContracts, Deco.Cap),
                    path: WebsitePaths.SmartContracts,
                },
                {
                    title: this.props.translate.get(Key.Connect, Deco.Cap),
                    path: WebsitePaths.Connect,
                },
                {
                    title: this.props.translate.get(Key.Whitepaper, Deco.Cap),
                    path: WebsitePaths.Whitepaper,
                    isExternal: true,
                },
                {
                    title: this.props.translate.get(Key.Wiki, Deco.Cap),
                    path: WebsitePaths.Wiki,
                },
                {
                    title: this.props.translate.get(Key.FAQ, Deco.Cap),
                    path: WebsitePaths.FAQ,
                },
            ],
            [Key.Community]: [
                {
                    title: this.props.translate.get(Key.RocketChat, Deco.Cap),
                    isExternal: true,
                    path: constants.URL_ZEROEX_CHAT,
                },
                {
                    title: this.props.translate.get(Key.Blog, Deco.Cap),
                    isExternal: true,
                    path: constants.URL_BLOG,
                },
                {
                    title: 'Twitter',
                    isExternal: true,
                    path: constants.URL_TWITTER,
                },
                {
                    title: 'Reddit',
                    isExternal: true,
                    path: constants.URL_REDDIT,
                },
                {
                    title: this.props.translate.get(Key.Forum, Deco.Cap),
                    isExternal: true,
                    path: constants.URL_DISCOURSE_FORUM,
                },
            ],
            [Key.Organization]: [
                {
                    title: this.props.translate.get(Key.About, Deco.Cap),
                    isExternal: false,
                    path: WebsitePaths.About,
                },
                {
                    title: this.props.translate.get(Key.Careers, Deco.Cap),
                    isExternal: true,
                    path: constants.URL_ANGELLIST,
                },
                {
                    title: this.props.translate.get(Key.Contact, Deco.Cap),
                    isExternal: true,
                    path: 'mailto:team@0xproject.com',
                },
            ],
        };
        return (
            <div className="relative pb4 pt2" style={{ backgroundColor: colors.darkerGrey }}>
                <div className="mx-auto max-width-4 md-px2 lg-px0 py4 clearfix" style={{ color: colors.white }}>
                    <div className="col lg-col-4 md-col-4 col-12 left">
                        <div className="sm-mx-auto" style={{ width: 148 }}>
                            <div>
                                <img src="/images/protocol_logo_white.png" height="30" />
                            </div>
                            <div
                                style={{
                                    fontSize: 11,
                                    color: colors.grey,
                                    paddingLeft: 37,
                                    paddingTop: 2,
                                }}
                            >
                                © ZeroEx, Intl.
                            </div>
                        </div>
                    </div>
                    <div className="col lg-col-8 md-col-8 col-12 lg-pl4 md-pl4">
                        <div className="col lg-col-4 md-col-4 col-12">
                            <div className="lg-right md-right sm-center">
                                {this._renderHeader(Key.Documentation)}
                                {_.map(menuItemsBySection[Key.Documentation], this._renderMenuItem.bind(this))}
                            </div>
                        </div>
                        <div className="col lg-col-4 md-col-4 col-12 lg-pr2 md-pr2">
                            <div className="lg-right md-right sm-center">
                                {this._renderHeader(Key.Community)}
                                {_.map(menuItemsBySection[Key.Community], this._renderMenuItem.bind(this))}
                            </div>
                        </div>
                        <div className="col lg-col-4 md-col-4 col-12">
                            <div className="lg-right md-right sm-center">
                                {this._renderHeader(Key.Organization)}
                                {_.map(menuItemsBySection[Key.Organization], this._renderMenuItem.bind(this))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    private _renderIcon(fileName: string) {
        return (
            <div style={{ height: ICON_DIMENSION, width: ICON_DIMENSION }}>
                <img src={`/images/social/${fileName}`} style={{ width: ICON_DIMENSION }} />
            </div>
        );
    }
    private _renderMenuItem(item: FooterMenuItem) {
        const iconIfExists = titleToIcon[item.title];
        return (
            <div key={item.title} className="sm-center" style={{ fontSize: 13, paddingTop: 25 }}>
                {item.isExternal ? (
                    <a className="text-decoration-none" style={linkStyle} target="_blank" href={item.path}>
                        {!_.isUndefined(iconIfExists) ? (
                            <div className="sm-mx-auto" style={{ width: 65 }}>
                                <div className="flex">
                                    <div className="pr1">{this._renderIcon(iconIfExists)}</div>
                                    <div>{item.title}</div>
                                </div>
                            </div>
                        ) : (
                            item.title
                        )}
                    </a>
                ) : (
                    <Link to={item.path} style={linkStyle} className="text-decoration-none">
                        <div>
                            {!_.isUndefined(iconIfExists) && (
                                <div className="pr1">{this._renderIcon(iconIfExists)}</div>
                            )}
                            {item.title}
                        </div>
                    </Link>
                )}
            </div>
        );
    }
    private _renderHeader(key: Key) {
        const headerStyle = {
            color: colors.grey400,
            letterSpacing: 2,
            fontFamily: 'Roboto Mono',
            fontSize: 13,
        };
        return (
            <div className="lg-pb2 md-pb2 sm-pt4" style={headerStyle}>
                {this.props.translate.get(key, Deco.Upper)}
            </div>
        );
    }
}
