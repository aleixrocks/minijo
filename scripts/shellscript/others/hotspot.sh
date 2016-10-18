#!/bin/bash

IF="eth0"
#IF="wlan0"

sudo rfkill unblock wifi
sudo ifconfig wlan1 192.168.42.1
sleep 3
sudo service hostapd start
sleep 1
sudo service udhcpd start
sleep 1
sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
sudo iptables -t nat -A POSTROUTING -o $IF -j MASQUERADE
sudo iptables -A FORWARD -i $IF -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i wlan0 -o $IF -j ACCEPT
