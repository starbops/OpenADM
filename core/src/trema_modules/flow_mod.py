import httplib
import json


class Flow_mod:
	def __init__(self,core,parm):		
		self.IP = "localhost"
		self.Port = "8080"
		self.headers = {
			'Content-type': 'application/json',
			'Accept': 'application/json',
		}
		if parm:
			if parm.has_key("ip"):
				self.IP = parm['ip']
			if parm.has_key("port"):
				self.Port = str(parm['port'])
		# register websocket api
		self.addUrl="/uds/add"
		self.delUrl="/uds/del"
		core.registerURLApi("uds/add", self.udsAddHandler)
		core.registerURLApi("uds/del", self.udsDelHandler)

	def udsAddHandler(self,entity):
		url = self.addUrl
		if not entity:
			print "No get data from WEBUI"
			return
		if 'match' not in entity or len(entity['match'])==0:
			return

		if 'dpid' in entity:
			url  = url + "/"+entity['dpid']
			entity.pop('dpid',None)
		else:
			url = url +"all"
		conn = httplib.HTTPConnection(self.IP,self.Port)
		conn.request('PUT', url, json.dumps(entity), self.headers)
		response = conn.getresponse()
		ret = (response.status, response.reason, response.read())
		conn.close()
		if ret[0] != 200:
			print "add uds error"
		msg = json.dumps(ret)
		return msg

	def udsDelHandler(self,entity):
		url = self.delUrl
		if not entity:
			print "No get data from WEBUI"
			return
		if 'match' not in entity or len(entity['match'])==0:
			return

		if 'dpid' in entity:
			url  = url + "/"+entity['dpid']
			entity.pop('dpid',None)
		else:
			url = url +"all"
		conn = httplib.HTTPConnection(self.IP,self.Port)
		conn.request('PUT', url, json.dumps(entity), self.headers)
		response = conn.getresponse()
		ret = (response.status, response.reason, response.read())
		conn.close()
		if ret[0] != 200:
			print "del uds error"
		msg = json.dumps(ret)
		return msg
