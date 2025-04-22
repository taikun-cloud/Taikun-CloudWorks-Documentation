# **Configure Postfix Client**

## **Install Postfix**

To install [Postfix](https://www.postfix.org/) run the following command:

sudo apt install postfix

It is OK to accept defaults initially by pressing return for each question. Some of the configuration options will be investigated in greater detail in the configuration stage.

!!! Warning
	The `mail-stack-delivery` metapackage has been deprecated in Focal. The package still exists for compatibility reasons, but won’t setup a working email system.

---

## **Configure Postfix**

There are four things you should decide before configuring:

* The \<Domain> for which you’ll accept email (we’ll use **`mail.example.com`** in our example)

* The network and class range of your mail server (we’ll use **`192.168.0.0/24`**)

* The username (we’re using **`steve`**)

* Type of mailbox format (*`mbox`* is the default, but we’ll use the alternative, **`Maildir`**)

To configure postfix, run the following command:

sudo dpkg-reconfigure postfix

The user interface will be displayed. On each screen, select the following values:

* Internet Site

* **`mail.example.com`**

* **`steve`**

* **`mail.example.com`**, `localhost.localdomain`, `localhost`

* No

* `127.0.0.0/8 \[::ffff:127.0.0.0\]/104 \[::1\]/128` **`192.168.0.0/24`**

* 0

* \+

* all

To set the mailbox format, you can either edit the configuration file directly, or use the `postconf` command. In either case, the configuration parameters will be stored in `/etc/postfix/main.cf` file. Later if you wish to re-configure a particular parameter, you can either run the command or change it manually in the file.

### Configure mailbox format

To configure the mailbox format for **`Maildir`**:

sudo postconf -e 'home\_mailbox = Maildir/'

This will place new mail in `/home/<username>/Maildir` so you will need to configure your Mail Delivery Agent (MDA) to use the same path.

---

## **SMTP authentication**

SMTP-AUTH allows a client to identify itself through the Simple Authentication and Security Layer (SASL) authentication mechanism, using Transport Layer Security (TLS) to encrypt the authentication process. Once it has been authenticated, the SMTP server will allow the client to relay mail.

### Configure SMTP authentication

To configure Postfix for SMTP-AUTH using SASL (Dovecot SASL), run these commands at a terminal prompt:

sudo postconf -e 'smtpd\_sasl\_type = dovecot'
sudo postconf -e 'smtpd\_sasl\_path = private/auth'
sudo postconf -e 'smtpd\_sasl\_local\_domain ='
sudo postconf -e 'smtpd\_sasl\_security\_options = noanonymous,noplaintext'
sudo postconf -e 'smtpd\_sasl\_tls\_security\_options = noanonymous'
sudo postconf -e 'broken\_sasl\_auth\_clients = yes'
sudo postconf -e 'smtpd\_sasl\_auth\_enable = yes'
sudo postconf -e 'smtpd\_recipient\_restrictions = \\
permit\_sasl\_authenticated,permit\_mynetworks,reject\_unauth\_destination'

!!! Note
	The `smtpd_sasl_path` config parameter is a path relative to the Postfix queue directory.

There are several SASL mechanism properties worth evaluating to improve the security of your deployment. The options “noanonymous,noplaintext” prevent the use of mechanisms that permit anonymous authentication or that transmit credentials unencrypted.

### Configure TLS

Next, generate or obtain a digital certificate for TLS. MUAs connecting to your mail server via TLS will need to recognise the certificate used for TLS. This can either be done using a certificate from Let’s Encrypt, from a commercial CA or with a self-signed certificate that users manually install/accept.

For MTA-to-MTA, TLS certificates are never validated without prior agreement from the affected organisations. For MTA-to-MTA TLS, there is no reason not to use a self-signed certificate unless local policy requires it. See our [guide on security certificates](https://ubuntu.com/server/docs/security-certificates) for details about generating digital certificates and setting up your own Certificate Authority (CA).

Once you have a certificate, configure Postfix to provide TLS encryption for both incoming and outgoing mail:

sudo postconf -e 'smtp\_tls\_security\_level = may'
sudo postconf -e 'smtpd\_tls\_security\_level = may'
sudo postconf -e 'smtp\_tls\_note\_starttls\_offer = yes'
sudo postconf -e 'smtpd\_tls\_key\_file = /etc/ssl/private/server.key'
sudo postconf -e 'smtpd\_tls\_cert\_file = /etc/ssl/certs/server.crt'
sudo postconf -e 'smtpd\_tls\_loglevel = 1'
sudo postconf -e 'smtpd\_tls\_received\_header = yes'
sudo postconf -e 'myhostname = mail.example.com'

If you are using your own Certificate Authority to sign the certificate, enter:

sudo postconf -e 'smtpd\_tls\_CAfile = /etc/ssl/certs/cacert.pem'

Again, for more details about certificates see our [security certificates guide](https://ubuntu.com/server/docs/security-certificates).

### Outcome of initial configuration

After running all the above commands, Postfix will be configured for SMTP-AUTH with a self-signed certificate for TLS encryption.

Now, the file `/etc/postfix/main.cf` should look like this:

\# See /usr/share/postfix/main.cf.dist for a commented, more complete
\# version
&#x20;  &#x20;
smtpd\_banner = $myhostname ESMTP $mail\_name (Ubuntu)
biff = no
&#x20;  &#x20;
\# appending .domain is the MUA's job.
append\_dot\_mydomain = no
&#x20;  &#x20;
\# Uncomment the next line to generate "delayed mail" warnings
\#delay\_warning\_time = 4h
&#x20;  &#x20;
myhostname = server1.example.com
alias\_maps = hash:/etc/aliases
alias\_database = hash:/etc/aliases
myorigin = /etc/mailname
mydestination = server1.example.com, localhost.example.com, localhost
relayhost =
mynetworks = 127.0.0.0/8
mailbox\_command = procmail -a "$EXTENSION"
mailbox\_size\_limit = 0
recipient\_delimiter = +
inet\_interfaces = all
smtpd\_sasl\_local\_domain =
smtpd\_sasl\_auth\_enable = yes
smtpd\_sasl\_security\_options = noanonymous
broken\_sasl\_auth\_clients = yes
smtpd\_recipient\_restrictions =
permit\_sasl\_authenticated,permit\_mynetworks,reject \_unauth\_destination
smtpd\_tls\_auth\_only = no
smtp\_tls\_security\_level = may
smtpd\_tls\_security\_level = may
smtp\_tls\_note\_starttls\_offer = yes
smtpd\_tls\_key\_file = /etc/ssl/private/smtpd.key
smtpd\_tls\_cert\_file = /etc/ssl/certs/smtpd.crt
smtpd\_tls\_CAfile = /etc/ssl/certs/cacert.pem
smtpd\_tls\_loglevel = 1
smtpd\_tls\_received\_header = yes
smtpd\_tls\_session\_cache\_timeout = 3600s
tls\_random\_source = dev:/dev/urandom

The Postfix initial configuration is now complete. Run the following command to restart the Postfix daemon:

sudo systemctl restart postfix.service

---

## **SASL**

Postfix supports SMTP-AUTH as defined in [RFC2554](http://www.ietf.org/rfc/rfc2554.txt). It is based on [SASL](http://www.ietf.org/rfc/rfc2222.txt). However it is still necessary to set up SASL authentication before you can use SMTP-AUTH.

When using IPv6, the `mynetworks` parameter may need to be modified to allow IPv6 addresses, for example:

mynetworks = 127.0.0.0/8, \[::1]/128

### Configure SASL

Postfix supports two SASL implementations: **Cyrus SASL** and **Dovecot SASL**.

To enable Dovecot SASL the `dovecot-core` package will need to be installed:

sudo apt install dovecot-core

Next, edit `/etc/dovecot/conf.d/10-master.conf` and change the following:

service auth \{
&#x20; \# auth\_socket\_path points to this userdb socket by default. It's typically
&#x20; \# used by dovecot-lda, doveadm, possibly imap process, etc. Its default
&#x20; \# permissions make it readable only by root, but you may need to relax these
&#x20; \# permissions. Users that have access to this socket are able to get a list
&#x20; \# of all usernames and get results of everyone's userdb lookups.
&#x20; unix\_listener auth-userdb \{
&#x20;   \#mode = 0600
&#x20;   \#user =&#x20;
&#x20;   \#group =&#x20;
&#x20; }
&#x20;  &#x20;
&#x20; \# Postfix smtp-auth
&#x20; unix\_listener /var/spool/postfix/private/auth \{
&#x20;   mode = 0660
&#x20;   user = postfix
&#x20;   group = postfix
&#x20; }
&#x20;}

To permit use of SMTP-AUTH by Outlook clients, change the following line in the **authentication mechanisms** section of `/etc/dovecot/conf.d/10-auth.conf` from:

auth\_mechanisms = plain

to this:

auth\_mechanisms = plain login

Once you have configured Dovecot, restart it with:

sudo systemctl restart dovecot.service

---

## **Test your setup**

SMTP-AUTH configuration is complete – now it is time to test the setup. To see if SMTP-AUTH and TLS work properly, run the following command:

telnet mail.example.com 25

After you have established the connection to the Postfix mail server, type:

ehlo mail.example.com

If you see the following in the output, then everything is working perfectly. Type `quit` to exit.

250-STARTTLS
250-AUTH LOGIN PLAIN
250-AUTH=LOGIN PLAIN
250 8BITMIME

---

## **Troubleshooting**

When problems arise, there are a few common ways to diagnose the cause.

### Escaping `chroot`

The Ubuntu Postfix package will, by default, install into a `chroot` environment for security reasons. This can add greater complexity when troubleshooting problems.

To turn off the `chroot` usage, locate the following line in the `/etc/postfix/master.cf` configuration file:

smtp      inet  n       -       -       -       -       smtpd

Modify it as follows:

smtp      inet  n       -       n       -       -       smtpd

You will then need to restart Postfix to use the new configuration. From a terminal prompt enter:

sudo service postfix restart

### SMTPS

If you need secure SMTP, edit `/etc/postfix/master.cf` and uncomment the following line:

smtps     inet  n       -       -       -       -       smtpd
&#x20; -o smtpd\_tls\_wrappermode=yes
&#x20; -o smtpd\_sasl\_auth\_enable=yes
&#x20; -o smtpd\_client\_restrictions=permit\_sasl\_authenticated,reject
&#x20; -o milter\_macro\_daemon\_name=ORIGINATING

### Log viewing

Postfix sends all log messages to `/var/log/mail.log`. However, error and warning messages can sometimes get lost in the normal log output so they are also logged to `/var/log/mail.err` and `/var/log/mail.warn` respectively.

To see messages entered into the logs in real time you can use the `tail -f` command:

tail -f /var/log/mail.err

### Increase logging detail

The amount of detail recorded in the logs can be increased via the configuration options. For example, to increase TLS activity logging set the `smtpd_tls_loglevel` option to a value from 1 to 4.

sudo postconf -e 'smtpd\_tls\_loglevel = 4'

Reload the service after any configuration change, to activate the new config:

sudo systemctl reload postfix.service

### Logging mail delivery

If you are having trouble sending or receiving mail from a specific domain you can add the domain to the `debug_peer_list` parameter.

sudo postconf -e 'debug\_peer\_list = problem.domain'
sudo systemctl reload postfix.service

### Increase daemon verbosity

You can increase the verbosity of any Postfix daemon process by editing the `/etc/postfix/master.cf` and adding a `-v` after the entry. For example, edit the `smtp` entry:

smtp      unix  -       -       -       -       -       smtp -v

Then, reload the service as usual:

sudo systemctl reload postfix.service

### Log SASL debug info

To increase the amount of information logged when troubleshooting SASL issues you can set the following options in `/etc/dovecot/conf.d/10-logging.conf`

auth\_debug=yes
auth\_debug\_passwords=yes

As with Postfix, if you change a Dovecot configuration the process will need to be reloaded:

`sudo systemctl reload dovecot.service`
