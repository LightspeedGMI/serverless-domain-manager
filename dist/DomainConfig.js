"use strict";
/**
 * Wrapper class for Custom Domain information
 */
const Globals_1 = require("./Globals");
class DomainConfig {
    constructor(config) {
        this.enabled = this.evaluateEnabled(config.enabled);
        this.givenDomainName = config.domainName;
        this.hostedZonePrivate = config.hostedZonePrivate;
        this.certificateArn = config.certificateArn;
        this.certificateName = config.certificateName;
        this.createRoute53Record = config.createRoute53Record;
        this.hostedZoneId = config.hostedZoneId;
        this.hostedZonePrivate = config.hostedZonePrivate;
        this.allowPathMatching = config.allowPathMatching;
        let basePath = config.basePath;
        if (basePath == null || basePath.trim() === "") {
            basePath = "(none)";
        }
        this.basePath = basePath;
        let stage = config.stage;
        if (typeof stage === "undefined") {
            stage = Globals_1.default.options.stage || Globals_1.default.serverless.service.provider.stage;
        }
        this.stage = stage;
        const endpointTypeWithDefault = config.endpointType || Globals_1.default.endpointTypes.edge;
        const endpointTypeToUse = Globals_1.default.endpointTypes[endpointTypeWithDefault.toLowerCase()];
        if (!endpointTypeToUse) {
            throw new Error(`${endpointTypeWithDefault} is not supported endpointType, use edge or regional.`);
        }
        this.endpointType = endpointTypeToUse;
        const apiTypeWithDefault = config.apiType || Globals_1.default.apiTypes.rest;
        const apiTypeToUse = Globals_1.default.apiTypes[apiTypeWithDefault.toLowerCase()];
        if (!apiTypeToUse) {
            throw new Error(`${apiTypeWithDefault} is not supported api type, use REST, HTTP or WEBSOCKET.`);
        }
        this.apiType = apiTypeToUse;
        const securityPolicyDefault = config.securityPolicy || Globals_1.default.tlsVersions.tls_1_2;
        const tlsVersionToUse = Globals_1.default.tlsVersions[securityPolicyDefault.toLowerCase()];
        if (!tlsVersionToUse) {
            throw new Error(`${securityPolicyDefault} is not a supported securityPolicy, use tls_1_0 or tls_1_2.`);
        }
        this.securityPolicy = tlsVersionToUse;
    }
    /**
     * Determines whether this plug-in is enabled.
     *
     * This method reads the customDomain property "enabled" to see if this plug-in should be enabled.
     * If the property's value is undefined, a default value of true is assumed (for backwards
     * compatibility).
     * If the property's value is provided, this should be boolean, otherwise an exception is thrown.
     * If no customDomain object exists, an exception is thrown.
     */
    evaluateEnabled(enabled) {
        // const enabled = this.serverless.service.custom.customDomain.enabled;
        if (enabled === undefined) {
            return true;
        }
        if (typeof enabled === "boolean") {
            return enabled;
        }
        else if (typeof enabled === "string" && enabled === "true") {
            return true;
        }
        else if (typeof enabled === "string" && enabled === "false") {
            return false;
        }
        throw new Error(`serverless-domain-manager: Ambiguous enablement boolean: "${enabled}"`);
    }
}
module.exports = DomainConfig;
